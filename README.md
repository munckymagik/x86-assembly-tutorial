# Basic x86 Assembly Lanugage Tutorial on Mac OS X

TODO write a motivation.

Intro notes:
* Will use Gnu AS (GAS) "like" assembler. The LLVM assembler on Mac OS X can be used as it has the same interface, similarly the MinGW assembler on Windows as I believe it is derived from GAS.
* We will use AT&T syntax rather than Intel, as this is the format compilers and disassemblers seem to output by default according to my limited experience so far.

## The smallest program we can get away with

Here is the smallest program we can write. It declares a `main` method that does nothing except immediately return a `0` exit status.

The heading says "get away with" because in order to be so small we are ommitting an inportant discipline required for writing reliable assembly language code - managing the stack - but this doesn't matter for now. We'll explain more on this later.

```s
.text
.globl	_main
_main:
  movl	$0, %eax
  retl
```

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

This uses another directive and is the first part of declarating our `main` function. `main` is the entry point to our program. The `globl` directive makes the label `_main` a symbol visible to the linker (`ld`).

```s
_main:
```

This declares the label `_main`. This is the symbol that was previously made visible to the linker using `.globl`. Although we will refer to our function as `main` there is a convention that function names are prefixed with an underscore. This will be better explained later when we cover "calling conventions".

At this point we have defined the empty shell of a program and the start of a function. Next we implement the body of our main function with an actual assembly language instruction:

```s
movl	$0, %eax
```

This uses the `mov` instruction to load the literal number `0` into AX - the "accumulator register".

We are working in 32-bit mode so the `mov` instruction is suffixed with an `l` for "long", which makes it the 32-bit version of the `mov` instruction. Rather than 64-bit, 16-bit or 8 all of which are options. More on that later.

Similarly, because we are using a 32-bit instruction we also need to access the AX register as a 32-bit value. We do this by prepending the register name with an `e`, thus `eax`.

```s
retl
```

Finally, `ret` returns control to the lower-level code which called our `main` function. Effectively making the CPU continue executing where we left off before `main` function was called.

If we want to set a different exit status we can change the value loaded into AX.

```s
.text
.globl	_main
_main:
  movl	$17, %eax    # <--- we now return the exit code 17
  retl
```

Note that we were able to add an inline-comment to the above example using a hash `#` character.

If we compile and run this version we should see it set an exit status of `17`.

```
$ gcc -m32 main_method_return_0.s -o main_method_return_0.out
$ ./main_method_return_0.out; echo "Exit status was: $?"
Exit status was: 17
```

### Key points

* We need to use the `.text` directive to place our program code in the correct section of the compiled executable.
* To make a function we name a block of code using a label e.g. `_main`
* The `_main` function needs to be made visible to the linker using `.globl _main`
* To return a value from a function we need to place it into the AX register
* We use the `retl` function to exit our function an return to the code that called it.

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
