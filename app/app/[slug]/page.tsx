import AppPage from "@/components/featured/app";

export default function Page({ params }: { params: { slug: string } }) {
  return <AppPage id={params.slug} />;
}
