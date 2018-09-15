#ifndef XUTILS_H
#define XUTILS_H

#ifdef __linux__
  #define CSYM(name) name
#else
  #define CSYM(name) _##name
#endif

#endif /* XUTILS_H */

