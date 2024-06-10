export default async function Data() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 3000);
  });

  return <div>aaa</div>;
}
