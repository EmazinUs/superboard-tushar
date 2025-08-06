export async function mockApiRequest<T>(data: T, delay = 800, shouldError = false): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldError) {
        reject(new Error('Mock API request failed'));
      } else {
        resolve(data);
      }
    }, delay);
  });
}
