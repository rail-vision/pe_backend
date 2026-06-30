const errorHandler = (err, req, res, next) => {

    console.error(
        "[Global Error]",
        err.code ?? "NO_CODE",
        err.message
    );

    if (
        err.message?.includes("Unexpected end of form") ||
        err.message?.includes("Multipart") ||
        err.code?.startsWith("LIMIT_")
    ) {
        return res.status(400).json({
            success: false,
            message: "File upload failed. Make sure you are sending a valid multipart/form-data request."
        });
    }

    return res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

};

module.exports = errorHandler;