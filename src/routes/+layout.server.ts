import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ fetch, locals }) => {
  const user = (await locals.auth.validate())?.user;
  const pdmResponse = await fetch("/api/pdm");
  const classeResponse = await fetch("/api/classe");
  const unidadeResponse = await fetch("/api/unidade");
  if (!pdmResponse.ok) {
    // Handle the error appropriately
    console.error("Failed to fetch /api/pdm");
    return { props: { pdms: [] } }; // Return an empty array or some error indication as needed
  }
  if (!classeResponse.ok) {
    // Handle the error appropriately
    console.error("Failed to fetch /api/classe");
    return { props: { classes: [] } }; // Return an empty array or some error indication as needed
  }
  if (!unidadeResponse.ok) {
    // Handle the error appropriately
    console.error("Failed to fetch /api/unidade");
    return { props: { unidades: [] } }; // Return an empty array or some error indication as needed
  }

  const pdms = await pdmResponse.json();
  const classes = await classeResponse.json();
  const unidades = await unidadeResponse.json();
  console.log("pdms", pdms);
  return { user, props: { pdms, classes, unidades } };
};
