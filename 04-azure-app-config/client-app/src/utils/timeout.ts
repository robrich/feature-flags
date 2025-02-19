export default function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
