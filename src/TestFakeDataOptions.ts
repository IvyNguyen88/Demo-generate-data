// import { generateFakeData } from 'agent-ai-faker';
import { generateFakeData } from './generateFakeData';

const formats = ["JSON", "CSV", "TEXT"] as const;

// // const options = {
// //     purpose: "testing",
// //     // format: "JSON", // hoặc CSV, TEXT
// //     // format: "JSON" as const,
// //     format: format,
// //     fields: ["UUID", "name", "age", "email"],
// //     volume: 1000,
// //     constraints: "age between 18 and 20, email in example@domain.com format",
// // };


// generateFakeData(options)
//     .then((filePath) => {
//         console.log("📁 Dữ liệu được lưu tại:", filePath);
//     })
//     .catch((err) => {
//         console.error("❌ Lỗi khi sinh dữ liệu:", err);
//     });

formats.forEach((format) => {
    const options = {
        purpose: "testing",
        format: format,
        fields: ["UUID", "name", "age"],
        volume: 1000,
        constraints: "age between 18 and 20, email in example@domain.com format",
    };

    generateFakeData(options)
        .then((filePath) => {
            console.log(`[✓] Generated ${format} -> ${filePath}`);
        })
        .catch((err) => {
            console.error(`[X] Error generating ${format}:`, err);
        });
});
