
export function waUrl(tel: string, message: string) {
  const clean = tel.replace(/\s+/g, "").replace(/^00/, "+");
  return `https://wa.me/${clean.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export function generateSampleDrivers() {
  return [];
}
