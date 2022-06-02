
import pako from 'pako';

function zipToData(array) {
    let str = '';
    let i = 0;
    const len = array.length;
    let char1 = 0;
    let char2 = 0;
    let char3 = 0;
    let char4 = 0;
    while (i < len) {
      char1 = array[i += 1];
      // 当单个字节时, 最大值 '01111111', 最小值 '00000000' 右移四位 07, 00
      // 当两个字节时, 最大值 '11011111', 最小值 '11000000' 右移四位 13, 12
      // 当三个字节时, 最大值 '11101111', 最小值 '11100000' 右移四位 14, 14
      if (char1 >> 4 <= 7) {
        str += String.fromCharCode(char1);
      } else if (char1 >> 4 === 12 || char1 >> 4 === 13) {
        char2 = array[i += 1];
        str += String.fromCharCode(((char1 & 0x1F) << 6) | (char2 & 0x3F));
      } else if (char1 >> 4 === 14) {
        char2 = array[i += 1];
        char3 = array[i += 1];
       char4 = ((char1 & 0x0F) << 12) | ((char2 & 0x3F) << 6);
        str += String.fromCharCode(char4 | ((char3 & 0x3F) << 0));
      }
    }
    return str;
}

export default function unzip(data) {
    const byteArray = new Uint8Array(data); // 切换数据编码为Uint8Array
    const pakoArr = pako.ungzip(byteArray); // 调用 pako 的方法解压数据
    return zipToData(pakoArr);
}


