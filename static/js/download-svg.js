import * as saveSvgAsPng from "https://cdn.skypack.dev/save-svg-as-png@1.4.17";
import { jsPDF } from "https://cdn.skypack.dev/jspdf@2.3.1";

const pdfBtn = document.getElementById("download-btn");

pdfBtn.addEventListener("click", () => {
  const element = document.getElementById("ticket-svg");
  const filename = "espektro-ticket.pdf";

  saveSvgAsPng.svgAsPngUri(element).then((dataUrl) => {
    const doc = new jsPDF('l', 'mm', [228, 132]);
    doc.addImage(dataUrl, "PNG", 0, 0).save(filename);
  });
});
