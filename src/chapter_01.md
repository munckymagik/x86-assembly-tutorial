# Chapter 1: The smallest assembly language program we can get away with

Below is the smallest program we can write in assembly language. The heading says "get away with" because in order to be so small we are ommitting an important discipline required for writing reliable assembly language code - managing the stack - but this doesn't matter for now. We'll explain more on this later.

```x86asm
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

To see our output, we echo the value of the `$?` shell variable which always contains the exit status of the last program to run.

You should see it output:

```
Exit status was: 0
```

And with that, you've made your first program in assembly language. Not quite "Hello world", but we'll get there later.

## Explanation

Let's examine this program line by line:

```x86asm
.text
```

This is a directive that declares the start of a section of program code. Executable program code is always placed into a `text` section. Other sections will be introduced later when we store data.

```x86asm
.globl	_main
```

This uses another directive and is the first part of declaring our `main` function. `main` is the _entry-point_ to our program. The `globl` directive makes the `_main` symbol visible outside of our code, which is generally referred to as _exporting_. This is necessary so that system code knows where to begin executing our program.

```x86asm
_main:
```

This declares the label `_main`. This is the symbol that was previously made visible to the linker using `.globl`. Although we will refer to our function as `main` there is a convention that function names are prefixed with an underscore. This will be better explained later when we cover "calling conventions".

At this point we have defined the empty shell of a program and the start of a function. Next we implement the body of our main function with an actual assembly language instruction:

```x86asm
movl $0, %eax
```

This uses the `mov` instruction to load the literal number `0` into AX - the "accumulator register".

We are working in 32-bit mode so the `mov` instruction is suffixed with an `l` for "long", which makes it the 32-bit version of the `mov` instruction. Rather than 64-bit, 16-bit or 8 all of which are options. More on that later.

Similarly, because we are using a 32-bit instruction we also need to access the AX register as a 32-bit value. We do this by prepending the register name with an `e`, thus `eax`.

```x86asm
retl
```

Finally, `ret` returns control to the system-code which called our `main` function. Effectively telling the CPU to continue executing where it left off before our `main` function was called.

If we want to set a different exit status we can change the value loaded into AX.

```x86asm
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

## Key points

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

## Exercises

### 1) An equivalent C program

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

### 2) Disassembling true and false

Two of the most basic Unix system tools are the `true` and `false` commands. One returns an exit status of `0` and the other returns `1`.

Using `objdump` disassemble these two binaries (*):

```
$ objdump -S /bin/true > true.s
$ objdump -S /bin/false > false.s
```

1) Open the two `.s` files in your editor. What observations can you make?
2) Why does `true` return `0` and `false` return `1`?

(*) on Mac OS X `objdump` might produce simpler output if you pass the `-macho` option in addition to `-S` (this is short for _Mach-O_ not _machismo_).
