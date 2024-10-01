import SQL from "./sql/sql";

async function test() {
    try {
        console.log("Validação de comunicação com banco de dados:\n");
        const db = new SQL();
        await db.connect();
        await db.disconnect();
        console.log("\nSUCESSO\n");
    } catch(err) {
        console.log("\nFALHA\n");
        console.log(err);
    }
}

test();
