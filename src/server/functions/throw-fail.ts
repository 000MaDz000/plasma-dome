export default function throwFail(msg: string) {
    console.log("ERROR:", msg.red);
    process.exit(1);
}