const pptxgen = require("pptxgenjs");

const generatePPT = async () => {

const ppt = new pptxgen();

ppt.author = "Pearl";
ppt.company = "Pearl Analytics";
ppt.subject = "Analytics Report";
ppt.title = "Pearl Presentation";

// Slide 1

const slide1 = ppt.addSlide();

slide1.addText(
"Pearl Analytics Report",
{
x: 1,
y: 1,
w: 6,
h: 1,
fontSize: 24,
bold: true
}
);

slide1.addText(
`Generated: ${new Date().toLocaleString()}`,
{
x: 1,
y: 2,
w: 4,
h: 1
}
);

// Slide 2

const slide2 = ppt.addSlide();

slide2.addText(
"Correlation Analysis",
{
x: 0.5,
y: 0.5,
w: 5,
h: 0.5,
fontSize: 20,
bold: true
}
);

slide2.addText(
"Correlation module integrated successfully",
{
x: 0.5,
y: 1.5,
w: 6,
h: 1
}
);

// Slide 3

const slide3 = ppt.addSlide();

slide3.addText(
"Outlier Analysis",
{
x: 0.5,
y: 0.5,
w: 5,
h: 0.5,
fontSize: 20,
bold: true
}
);

slide3.addText(
"Outlier module integrated successfully",
{
x: 0.5,
y: 1.5,
w: 6,
h: 1
}
);

// Slide 4

const slide4 = ppt.addSlide();

slide4.addText(
"Infographics",
{
x: 0.5,
y: 0.5,
w: 5,
h: 0.5,
fontSize: 20,
bold: true
}
);

slide4.addText(
"Bar Chart, Line Chart, Pie Chart, Scatter Plot, Heatmap",
{
x: 0.5,
y: 1.5,
w: 8,
h: 1
}
);

// Slide 5

const slide5 = ppt.addSlide();

slide5.addText(
"Executive Summary",
{
x: 0.5,
y: 0.5,
w: 5,
h: 0.5,
fontSize: 20,
bold: true
}
);

slide5.addText(
"Presentation generated successfully",
{
x: 0.5,
y: 1.5,
w: 6,
h: 1
}
);

const fileName =
`reports/report-${Date.now()}.pptx`;

await ppt.writeFile({
fileName
});

return fileName;

};

module.exports = {
generatePPT
};
