# Installing the required tools

Basically you need the `gcc` compiler (or an equivalent like `clang` with it's `gcc` frontend`).

On Mac OS X:

* You need to install Xcode with the Xcode command-line tools

On Ubuntu/debian Linux:

```
$ apt install build-essential gcc-multilib
```

On Windows:

* Install the [MinGW](http://www.mingw.org/) toolset

Once you've completed installation run the following to check you can access the required tools:

```
$ gcc --version
$ objdump --version
```

If you get output from both tools you are good to go.
