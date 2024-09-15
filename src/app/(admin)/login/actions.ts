"use server";
export async function onSubmit(state: unknown) {
  try {
    console.log(state);
  } catch (error) {
    throw error;
  }
}
