const intFunction = (i: number) => i;
const stringFunction = (str: string) => str;
const objFunction = (obj: Record<any, any>) => obj;


const genericFunction = <T>(arg: T) => arg;

const result = genericFunction<number>(1)