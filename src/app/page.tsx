import Card from "@/components/Card";
import Container from "@/components/Container";
import { data } from "@/constants/data";

export default function page() {
  const items = data;

  return (
    <div className="w-screen min-h-screen">
      <Container className="flex justify-center">
        <div className="grid p-4 gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((data) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </Container>
    </div>
  );
}
