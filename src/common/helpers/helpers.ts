export function formatDni(dni: string): string {
  let dniStr = dni?.toString();
  let dniReversed = dniStr?.split("").reverse().join("");
  let dniConPuntos = dniReversed?.match(/.{1,3}/g)?.join(".") || "";
  return dniConPuntos.split("").reverse().join("");
}
export function formatMatricula(matricula: string): string {
  let dniStr = matricula?.toString();
  let dniReversed = dniStr?.split("").reverse().join("");
  let dniConPuntos = dniReversed?.match(/.{1,3}/g)?.join(".") || "";
  return dniConPuntos.split("").reverse().join("");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} `;
}
export function formatDateWithTime(dateString: string): string {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes} `;
}

export function calculateAge(birthDate: string): number {
  const date = new Date(birthDate);
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export function capitalizeWords(input: any) {
  return input.toLowerCase().replace(/(?:^|\s)\S/g, function (a: any) { return a.toUpperCase(); });
}

