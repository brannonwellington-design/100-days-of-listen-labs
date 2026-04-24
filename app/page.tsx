import Generator from "@/components/Generator";
import { getImageManifest } from "@/lib/images";

export default async function Home() {
  const manifest = await getImageManifest();
  return (
    <main style={{ minHeight: "100vh", background: "var(--surface-primary)" }}>
      <Generator manifest={manifest} />
    </main>
  );
}
