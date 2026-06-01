const uploadService = require("../services/upload.service");
const csv = require("csv-parse/sync");
const xlsx = require("xlsx");
const { XMLParser } = require("fast-xml-parser");

/*FILE PARSERS*/

const parseCsv = (
  buffer,
  { firstRowHeaders = true, skipEmptyRows = true } = {},
) => {
  const records = csv.parse(buffer, {
    columns: firstRowHeaders,
    skip_empty_lines: skipEmptyRows,
    trim: true,
    relax_quotes: true,
    relax_column_count: true,
  });
  return records;
};

const parseTsv = (
  buffer,
  { firstRowHeaders = true, skipEmptyRows = true } = {},
) => {
  const records = csv.parse(buffer, {
    columns: firstRowHeaders,
    delimiter: "\t",
    skip_empty_lines: skipEmptyRows,
    trim: true,
  });
  return records;
};

const parseXlsx = (
  buffer,
  { firstRowHeaders = true, sheetName = null } = {},
) => {
  const workbook = xlsx.read(buffer, { type: "buffer", cellDates: true });

  const sheet =
    sheetName && workbook.SheetNames.includes(sheetName)
      ? workbook.Sheets[sheetName]
      : workbook.Sheets[workbook.SheetNames[0]];

  const rows = xlsx.utils.sheet_to_json(sheet, {
    header: firstRowHeaders ? undefined : 1,
    defval: null,
    blankrows: false,
  });

  return rows;
};

const parseJson = (buffer, { jsonKeyPath = "" } = {}) => {
  const parsed = JSON.parse(buffer.toString("utf-8"));

  if (!jsonKeyPath) {
    if (!Array.isArray(parsed)) {
      throw new Error(
        "JSON root is not an array. Provide a 'jsonKeyPath' to locate the data array.",
      );
    }
    return parsed;
  }

  const data = jsonKeyPath.split(".").reduce((obj, key) => obj?.[key], parsed);

  if (!Array.isArray(data)) {
    throw new Error(
      `jsonKeyPath "${jsonKeyPath}" did not resolve to an array in the JSON file.`,
    );
  }

  return data;
};

const parseXml = (buffer) => {
  const parser = new XMLParser({
    ignoreAttributes: false,
    parseAttributeValue: true,
    isArray: (_name, _jpath, isLeafNode) => !isLeafNode,
  });

  const result = parser.parse(buffer.toString("utf-8"));

 

  const findRowArray = (obj) => {
    // If it's an array — check if items are flat objects (rows) or nested
    if (Array.isArray(obj)) {
      if (obj.length === 0) return null;

      const first = obj[0];

      // Flat object with primitive values = these ARE the rows ✅
      const isFlatRow =
        typeof first === "object" &&
        first !== null &&
        Object.values(first).every((v) => !Array.isArray(v));

      if (isFlatRow) return obj;

      // Not flat — recurse into first item to go deeper
      return findRowArray(first);
    }

    // It's an object — recurse into each value
    if (typeof obj === "object" && obj !== null) {
      for (const key of Object.keys(obj)) {
        const found = findRowArray(obj[key]);
        if (found) return found;
      }
    }

    return null;
  };

  const rows = findRowArray(result);

  if (!rows || rows.length === 0) {
    throw new Error("Could not locate a row array in the XML file.");
  }

  return rows;
};

// FORMAT ROUTER


const parseFile = (format, buffer, options) => {
  switch (format) {
    case "csv":
      return parseCsv(buffer, options);
    case "tsv":
      return parseTsv(buffer, options);
    case "xlsx":
      return parseXlsx(buffer, options);
    case "json":
      return parseJson(buffer, options);
    case "xml":
      return parseXml(buffer, options);
    default:
      throw new Error(
        `Unsupported format "${format}". Accepted: csv, tsv, xlsx, json, xml.`,
      );
  }
};

// CONTROLLER


const uploadModuleData = async (req, res) => {
  try {
    // 1. Route param
    const { module } = req.params;

    // 2. File check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Send the file under the field name 'file'.",
      });
    }

    // 3. Options from form fields
    const format = (req.body.format ?? "csv").toLowerCase();
    const firstRowHeaders = (req.body.firstRowHeaders ?? "true") === "true";
    const skipEmptyRows = (req.body.skipEmptyRows ?? "true") === "true";
    const jsonKeyPath = req.body.jsonKeyPath ?? "";
    const sheetName = req.body.sheetName ?? null;

    // 4. Parse buffer → rows
    const rows = parseFile(format, req.file.buffer, {
      firstRowHeaders,
      skipEmptyRows,
      jsonKeyPath,
      sheetName,
    });
    // console.log("🔍 parsed rows:", JSON.stringify(rows, null, 2));

    if (!Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The uploaded file contains no data rows.",
      });
    }

    // 5. Service — validate + DB insert
    const result = await uploadService.processUpload(module, rows);

    // 6. Response
    return res.status(200).json({
      success: true,
      data: result,
      meta: {
        module,
        format,
        totalRows: rows.length,
      },
    });
  } catch (error) {
    console.error("[uploadModuleData]", error);

    const isClientError =
      error.message.includes("Unsupported format") ||
      error.message.includes("jsonKeyPath") ||
      error.message.includes("JSON root") ||
      error.message.includes("Could not locate") ||
      error.message.includes("Invalid module");

    return res.status(isClientError ? 400 : 500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { uploadModuleData };
