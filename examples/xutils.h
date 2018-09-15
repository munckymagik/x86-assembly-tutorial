#ifndef XUTILS_H
#define XUTILS_H

#ifdef __APPLE__
  #define CSYM(name) _##name
#else
  #define CSYM(name) name
#endif

#endif /* XUTILS_H */

