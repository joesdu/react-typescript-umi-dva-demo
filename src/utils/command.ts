/**
 * 按指定长度分段字符串
 * @param {str:string} 传入的字符串(非空)
 * @param {num:number} 指定长度(正整数)
 * @returns Array<string> (字符串数组)
 */
export const fixedLengthFormatString = (str: string, num: number): Array<string> => {
  if (str === null || str === undefined) return [];
  if (!/^[0-9]*[1-9][0-9]*$/.test(num.toString())) return [];
  let array: string[] = [];
  let len: number = str.length;
  for (let i: number = 0; i < len / num; i++) {
    if ((i + 1) * num > len) array.push(str.substring(i * num, len));
    else array.push(str.substring(i * num, (i + 1) * num));
  }
  return array;
};
/**
 * 取数据的小端格式(交换第1个和第2个元素位置) 该函数会修改原数组,所以无需返回值
 * @param {Array<string>} array 需要进行小端格式转换的数组
 */
export const getLittleEndian = (array: string[]): void => {
  let x: number = 1;
  let y: number = 2; // x < y
  array.splice(x - 1, 1, ...array.splice(y - 1, 1, array[x - 1]));
};
/**
 * 获取最小值到最大值之前的整数随机数
 * @param {Min: number} Min  最小值
 * @param {Max: number} Max  最大值
 * @returns {number} 最小值到最大值之前的整数随机数
 */
export const getRandomNum = (Min: number, Max: number): number => {
  let Range = Max - Min;
  let Rand = Math.random();
  return Min + Math.round(Rand * Range);
};
/**
 * 创建小端亮度值
 * @param {lightness: number} lightness 亮度值
 * @returns {string[]} 亮度值的小端值16进制数组
 */
export const creatLightness = (lightness: number): string[] => {
  let lightnessArray: string[] = [];
  let _lightness: string = lightness.toString(16);
  let lightnessArr: string[] = fixedLengthFormatString(_lightness.padStart(4, '0'), 2);
  for (let i: number = 0, item: string; (item = lightnessArr[i++]); ) {
    lightnessArray.push(item);
  }
  getLittleEndian(lightnessArray);
  return lightnessArray;
};
/**
 * 返回小端格式的色相值
 * @param {hue: number} hue 色相值
 * @returns {string[]} 色相值的小端值16进制数组
 */
export const creatHue = (hue: number): string[] => {
  let hueArray: string[] = [];
  let _hue: string = hue.toString(16);
  let hueArr = fixedLengthFormatString(_hue.padStart(4, '0'), 2);
  for (let i: number = 0, item: string; (item = hueArr[i++]); ) {
    hueArray.push(item);
  }
  getLittleEndian(hueArray);
  return hueArray;
};
/**
 * 创建小端格式的饱和度值.
 * @param {saturation: number} saturation 饱和度值
 * @returns {string[]} 饱和度的小端值16进制数组
 */
export const creatSaturation = (saturation: number): string[] => {
  let saturationArray: string[] = [];
  let _saturation: string = saturation.toString(16);
  let saturationArr: string[] = fixedLengthFormatString(_saturation.padStart(4, '0'), 2);
  for (let i: number = 0, item: string; (item = saturationArr[i++]); ) {
    saturationArray.push(item);
  }
  getLittleEndian(saturationArray);
  return saturationArray;
};
/**
 * 设置 RBG 灯光的 HSL 值
 * @param {lightness: number} 亮度
 * @param {hue: number} 色相
 * @param {saturation: number} 饱和度
 * @returns {string[]} HSL命令-16进制数组
 */
export const creatHslCommand = (lightness: number, hue: number, saturation: number): string[] => {
  let lightnessArray: string[] = creatLightness(lightness);
  let hueArray: Array<string> = creatHue(hue);
  let saturationArray: Array<string> = creatSaturation(saturation);
  let msgArray: string[] = lightnessArray.concat(hueArray, saturationArray);
  return msgArray;
};
/**
 * 取数据包消息ID,由函数产生一个 1-255 之间的随机数
 */
let currentTid: number = 0;
export const getTid = (): any => {
  let tid: number = getRandomNum(0x01, 0xff);
  if (currentTid !== tid) {
    currentTid = tid;
    return tid;
  } else getTid();
};
