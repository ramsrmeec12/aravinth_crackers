import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function InvoiceGenerator({ order, shopInfo }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    // ===== Header: INVOICE =====
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("INVOICE", 105, 20, { align: "center" });

    // ===== Shop Info =====
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(shopInfo?.name || "Aravinth Crackers Store", 14, 35);
    doc.setFontSize(11);
    doc.text(
      shopInfo?.address || "123 Main Street, Chennai, India - 600001",
      14,
      42
    );
    doc.text(
      shopInfo?.contact ||
        "Phone: +91 9876543210 | Email: info@aravinthcrackers.com",
      14,
      48
    );

    // Line separator
    doc.setDrawColor(0);
    doc.line(14, 52, 195, 52);

    // ===== Order Info =====
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Order Details:", 14, 62);

    doc.setFont("helvetica", "normal");
    doc.text(`Order No: ${order.id}`, 14, 70);
    doc.text(
      `Date: ${
        order.createdAt?.toDate
          ? order.createdAt.toDate().toLocaleDateString()
          : ""
      }`,
      14,
      76
    );
    doc.text(`Status: ${order.status || "Pending"}`, 14, 82);

    // ===== Customer Info =====
    doc.setFont("helvetica", "bold");
    doc.text("Customer Details:", 14, 95);

    doc.setFont("helvetica", "normal");
    doc.text(`Name: ${order.name}`, 14, 103);
    doc.text(`Phone: ${order.phone}`, 14, 109);
    if (order.email) doc.text(`Email: ${order.email}`, 14, 115);
    doc.text(`Address: ${order.address}, Pincode: ${order.pincode}`, 14, 121);

    // ===== Items Table =====
    const tableColumn = ["Item", "Qty", "Price", "Total"];
    const tableRows = [];

    order.items.forEach((item) => {
      const price = item.discountedPrice || item.originalPrice || 0;
      const lineTotal = price * item.qty;
      tableRows.push([
        item.name,
        item.qty, // numeric
        price, // numeric
        lineTotal, // numeric
      ]);
    });

    autoTable(doc, {
      startY: 130,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: { fillColor: [41, 128, 185] },
      styles: { halign: "center" }, // everything centered
      columnStyles: {
        0: { halign: "left" }, // Item name left
      },
    });

    // ===== Total =====
    const total = order.items?.reduce(
      (sum, item) =>
        sum + (item.discountedPrice || item.originalPrice || 0) * item.qty,
      0
    );

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(
      `Grand Total: ${total}`,
      175,
      doc.lastAutoTable.finalY + 10,
      { align: "right" }
    );

    // ===== Footer =====
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text(
      "Thank you for your purchase!",
      105,
      doc.lastAutoTable.finalY + 30,
      { align: "center" }
    );

    doc.save(`Invoice_${order.id}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      Invoice
    </button>
  );
}
