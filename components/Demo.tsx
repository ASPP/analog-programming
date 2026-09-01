const demo0 = `
fetch(0x00, REG0)
fetch(0x01, REG1)
fetch(0x02, REG2)
fetch(0x03, REG3)
sort(REG0, REG1)
sort(REG1, REG2)
sort(REG2, REG3)
sort(REG0, REG1)
sort(REG1, REG2)
sort(REG0, REG1)
push(REG3, 0x03)
fetch(0x04, REG3)
sort(REG2, REG3)
sort(REG1, REG2)
sort(REG0, REG1)
push(REG0, 0x00)
fetch(0x03, REG0)
sort(REG0, REG1)
sort(REG1, REG2)
sort(REG2, REG3)
sort(REG0, REG1)
sort(REG1, REG2)
sort(REG0, REG1)
push(REG0, 0x01)
push(REG1, 0x02)
push(REG2, 0x03)
push(REG3, 0x04)
halt
`;

const demo1 = `
fetch(0x00, REG0)
fetch(0x01, REG1)
sort(REG0, REG1)
push(REG1, 0x00)
push(REG0, 0x01)

fetch(0x00, REG0)
fetch(0x02, REG1)
sort(REG0, REG1)
push(REG1, 0x00)
push(REG0, 0x02)

fetch(0x00, REG0)
fetch(0x03, REG1)
sort(REG0, REG1)
push(REG1, 0x00)
push(REG0, 0x03)

fetch(0x00, REG0)
fetch(0x04, REG1)
sort(REG0, REG1)
push(REG1, 0x00)
push(REG0, 0x04)

fetch(0x01, REG0)
fetch(0x02, REG1)
sort(REG0, REG1)
push(REG1, 0x01)
push(REG0, 0x02)

fetch(0x01, REG0)
fetch(0x03, REG1)
sort(REG0, REG1)
push(REG1, 0x01)
push(REG0, 0x03)

fetch(0x01, REG0)
fetch(0x04, REG1)
sort(REG0, REG1)
push(REG1, 0x01)
push(REG0, 0x04)

fetch(0x02, REG0)
fetch(0x03, REG1)
sort(REG0, REG1)
push(REG1, 0x02)
push(REG0, 0x03)

fetch(0x02, REG0)
fetch(0x04, REG1)
sort(REG0, REG1)
push(REG1, 0x02)
push(REG0, 0x04)

fetch(0x03, REG0)
fetch(0x04, REG1)
sort(REG0, REG1)
push(REG1, 0x03)
push(REG0, 0x04)

halt
`;

export default function Demo({ setCode }: { setCode: (source: string) => void }) {
  return (
    <div className="flex justify-center">
      <button
        onClick={() => setCode(demo0)}
        className="rounded border border-blue-200 p-4 px-4 py-2 hover:bg-indigo-50"
      >
        Load demo
      </button>

      <button
        onClick={() => setCode(demo1)}
        className="rounded border border-blue-200 p-4 px-4 py-2 hover:bg-indigo-50"
      >
        Load group1
      </button>
    </div>
  );
}
