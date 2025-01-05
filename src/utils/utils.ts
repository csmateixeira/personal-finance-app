export class Utils {
  static getPageData<T>(data: T[], page: number): T[] {
    const start = (page - 1) * 10;
    const end = start + 10;

    return data.slice(start, end);
  }
}
