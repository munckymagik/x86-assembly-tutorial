# Basic x86 Assembly Lanugage Tutorial

TODO write a motivation.

Intro notes:
* Will use Gnu AS (GAS) "like" assembler. The LLVM assembler on Mac OS X can be used as it has the same interface, similarly the MinGW assembler on Windows as I believe it is derived from GAS.
* We will use AT&T syntax rather than Intel, as this is the format compilers and disassemblers seem to output by default according to my limited experience so far.

## Installing the required tools

Basically you need the `gcc` compiler (or an equivalent like `clang` with it's `gcc` frontend`).

On Mac OS X:

* You need to install Xcode with the Xcode command-line tools

On Ubuntu/debian Linux:

```
$ apt install build-essential
```

On Windows:

* Install the [MinGW](http://www.mingw.org/) toolset

Once you've completed installation run the following to check you can access the required tools:

```
$ gcc --version
$ objdump --version
```

If you get output from both tools you are good to go.

## Chapter 1: The smallest assembly language program we can get away with

Below is the smallest program we can write in assembly language. The heading says "get away with" because in order to be so small we are ommitting an important discipline required for writing reliable assembly language code - managing the stack - but this doesn't matter for now. We'll explain more on this later.

```s
.text
.globl	_main
_main:
  movl	$0, %eax
  retl
```

It declares a `main` method that does nothing except immediately return a `0` exit status.

Save this to a file called `main_method_return_0.s`, then you can compile it by running:

```
$ gcc -m32 main_method_return_0.s -o main_method_return_0.out
```

Then execute and examine the exit status of the process to see if it worked:

```
$ ./main_method_return_0.out; echo "Exit status was: $?"
```

You should see it output:

```
Exit status was: 0
```

And with that, you've made your first program in assembly language. Not quite "Hello world", but we'll get there later.

### Explanation

Let's examine this program line by line:

```s
.text
```

This is a directive that declares the start of a section of program code. Executable program code is always placed into a `text` section. Other sections will be introduced later when we store data.

```s
.globl	_main
```

This uses another directive and is the first part of declaring our `main` function. `main` is the _entry-point_ to our program. The `globl` directive makes the `_main` symbol visible outside of our code, which is generally referred to as _exporting_. This is necessary so that system code knows where to begin executing our program.

```s
_main:
```

This declares the label `_main`. This is the symbol that was previously made visible to the linker using `.globl`. Although we will refer to our function as `main` there is a convention that function names are prefixed with an underscore. This will be better explained later when we cover "calling conventions".

At this point we have defined the empty shell of a program and the start of a function. Next we implement the body of our main function with an actual assembly language instruction:

```s
movl $0, %eax
```

This uses the `mov` instruction to load the literal number `0` into AX - the "accumulator register".

We are working in 32-bit mode so the `mov` instruction is suffixed with an `l` for "long", which makes it the 32-bit version of the `mov` instruction. Rather than 64-bit, 16-bit or 8 all of which are options. More on that later.

Similarly, because we are using a 32-bit instruction we also need to access the AX register as a 32-bit value. We do this by prepending the register name with an `e`, thus `eax`.

```s
retl
```

Finally, `ret` returns control to the system-code which called our `main` function. Effectively telling the CPU continue executing where it left off before our `main` function was called.

If we want to set a different exit status we can change the value loaded into AX.

```s
.text
.globl _main
_main:
  movl $17, %eax    # <--- we now return the exit code 17
  retl
```

Note that we were able to add an inline-comment to the above example using a hash `#` character.

If we compile and run this version we should see it set an exit status of `17`.

```
$ gcc -m32 main_method_return_0.s -o main_method_return_0.out
$ ./main_method_return_0.out; echo "Exit status was: $?"
Exit status was: 17
```

---

### Key points

We have already covered a lot of points in this first small example.

In terms of program structure:

* We need to use the `.text` directive to place our program code in the correct section of the compiled executable
* To make a function we name a block of code using a label e.g. `_main:`
* The `_main` symbol needs to be _exported_ using `.globl _main` so the system knows the _entry-point_ to our program
* Non-executable code-comments can be added using a hash character `#`

Then considering executable instructions:

* We need to be explicit that we are using 32-bit mode by prefixing `e` to register names and suffixing instructions with `l`
* To return a value from a function we need to place it into the `AX` register
* We use the `retl` function to exit our function and return to the code that called it

---

### Exercises

#### 1) An equivalent C program

Given this C program roughly equivalent to our example:

```c
int main() {
    return 0;
}
```

Save it to a file called `main.c` then compile it to assembly language form using:

```
$ gcc -S -m32 main.c -o main.s
```

Open `main.s` in your editor.

* What differences do you notice between this and our simple program?
* What changes in the output if you make the return value `17` instead of `0`?

#### 2) Disassembling true and false

Two of the most basic Unix system tools are the `true` and `false` commands. One returns an exit status of `0` and the other returns `1`.

Using `objdump` disassemble these two binaries (*):

```
$ objdump -S /bin/true > true.s
$ objdump -S /bin/false > false.s
```

1) Open the two `.s` files in your editor. What observations can you make?
2) Why does `true` return `0` and `false` return `1`?

(*) on Mac OS X `objdump` might produce simpler output if you pass the `-macho` option in addition to `-S` (this is short for _Mach-O_ not _machismo_).

## Receiving input

## Calling a function

```s
.text

.globl	_main
_main:
  # Set up the stack
  pushl %ebp
  movl %esp, %ebp

  # Call add
  pushl $2
  pushl $3
  calll _add
  addl	$8, %esp

  # Return to calling code
  popl %ebp
  retl

_add:
  # Setup the stack
  pushl %ebp
  movl %esp, %ebp

  # Perform the calculation with the two arguments
  movl 8(%ebp), %eax
  addl 12(%ebp), %eax

  # Return to calling code
  popl %ebp
  retl
```
