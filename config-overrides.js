
// webpack loader 编写时的辅助函数
const loaderUtils = require("loader-utils");

// 纯字母
const allowedCharactersFirst =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
// 字母、数字、中划线、下划线
const allowedCharactersAfter = allowedCharactersFirst + "0123456789-_";

// 忽略的 class
const blacklist = [/^ad$/];
// 用 Map 来存所有生成过的  key-value 对
const idents = new Map();

// indexes 是一个数字数组
// 第一个数字对应 allowedCharactersFirst 中的字母（css 类的首字符不能是数字，所以只从字母字符串中取）
// 后面的数字是从 allowedCharactersAfter 中对应的位置取，数字的范围是 0-63，刚好对应字符串的范围
// 比如 [ 3, 14, 61 ] => d o 8
let indexes = [0];

const getNextIdent = (key) => {
  // 从 map 中取到使用过的 idents
  const usedIdents = Array.from(idents.values());
  let ident = "";

  do {
    ident = indexes
      .map((i, arrIndex) => {
        // Limit the index for allowedCharactersFirst to it's maximum index.
        // 要注意：选择器首位不能为数字，所以从 allowedCharactersFirst 中选择一个字符
        const maxIndexFirst = Math.min(i, allowedCharactersFirst.length - 1);

        return arrIndex === 0
          ? // 如果是首位
            allowedCharactersFirst[maxIndexFirst]
          : // 如果不是首位，则使用 allowedCharactersAfter
            allowedCharactersAfter[i];
      })
      // 选出来的字符拼接成字符串
      .join("");

    let i = indexes.length;
    // 从 indexes 最后开始往前扫描
    while (i--) {
      // 加 1
      indexes[i] += 1;
      // 如果 indexes[i] 对 allowedCharactersAfter 越界了
      // 则最后一位置 0，前一位 +1
      if (indexes[i] === allowedCharactersAfter.length) {
        // indexes[i] 置 0
        indexes[i] = 0;
        // 如果刚好首位是0，则在最后增加一个0，表示字符串长度加 1
        if (i === 0) indexes.push(0);
      } else break;
    }
  } while (
    // 如果已经生过了则跳过
    usedIdents.includes(ident) ||
    // 只要符合 ident.match(regex) 为 true，则 array.some 就返回 true
    blacklist.some((regex) => ident.match(regex))
  );
  // 生成的 key-value 对存储到 Map 结构中
  idents.set(key, ident);
  // 返回新生成的 ident
  return ident;
};

function getLocalIdent(
  context,
  // [hash:base64]
  localIdentName,
  // container => css 文件中写的 class name
  localName,
  options
) {
  // 基于文件路径和类名创建 hash，在整个项目中是唯一的
  // hash 是 5 位字符串
  const hash = loaderUtils.getHashDigest(
    // /.../Home.module.css + 类名
    context.resourcePath + localName,
    // hashType
    "md5",
    // digestType
    "base64",
    // 生成的字符串长度为 5
    5
  );

  // idents.get 如果获取不到，则使用算法生成
  return idents.get(hash) || getNextIdent(hash);
};



/**********************************以上生成getLocalIdent 提供一个定制的函数**************************************************************************/
const {
    override,
    fixBabelImports,
    addLessLoader,
    adjustStyleLoaders,
    addDecoratorsLegacy
  } = require('customize-cra');

  module.exports = override(
    
    addDecoratorsLegacy(),//配置装饰器

    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true, //自动打包相关的样式 默认为 style:'css'
    }),
    
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({  
      lessOptions: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
      },
      sourceMap:true,
    })
     /* 以下避免使用antd的时候发生冲突*/
    ,
    adjustStyleLoaders(({ use: [ , css] }) => {
      css.options.sourceMap = true;
      css.options.modules = {
// 产生原因：antd 默认是采用less 来渲染样式的，如果我们页面里采用css modules， 就会将antd的less文件也给编译一遍，导致样式渲染异常，所以我吗要排除掉对antd的影响。
        getLocalIdent: getLocalIdent
      }
    })
  )