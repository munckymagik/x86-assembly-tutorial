# Basic x86 Assembly Lanugage Tutorial on Mac OS X

* Will use Gnu AS (GAS) and AT&T syntax

## A main method with no body

Compile with:

```
gcc -S -m32 main_method_with_no_body.c
```

32-bit output:

```s
	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 12
	.globl	_main
	.p2align	4, 0x90
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	xorl	%eax, %eax
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl


.subsections_via_symbols

```

Meaning:

```s
	.section	__TEXT,__text,regular,pure_instructions
```

A directive that declares the start of a section of code. Try replacing with `.text`.

```s
	.macosx_version_min 10, 12
```

Probably a meta-data directive to be consumed by the Mac assembler (llvm) so it can check the correctness of the code that follows.

```s
	.globl	_main
```

Makes the `_main` symbol (label) visible to the linkder `ld`.

```s
	.p2align	4, 0x90
```

Optimizes the location of the this section of code back-filling with 0x90 NOP instruction. See https://stackoverflow.com/questions/21546946/what-does-p2align-do-in-asm-code.

```s
_main:
```

Declares the label `_main`. This is the symbol that was previously made visible to the linker.

```s
	pushl	%ebp
	movl	%esp, %ebp
```

The first line places the value of the base-pointer `%ebp` on the stack and decrements the stack pointer `%esp`. The second copies the new value of the stack pointer to the base pointer.

The effect is to save the previous value of the base-pointer, then point both SP and BP to the start of the new stack frame.

```s
	pushl	%eax
	xorl	%eax, %eax
```

Pushes the value of the accumulator register `%eax` onto the stack and decrements the stack pointer `%esp`. This effectively saves it's old value in case it's needed later.

Next `%eax` is XOR'd with itself, placing the result back back in `%eax`. Effectively `ax = ax XOR ax`. The side-effect of this is to set all bits in AX to 0. Presumably this is a more "efficient" trick to zero a register than to `movl $0, $eax` which uses immediate addressing to `$0`?

```s
	movl	$0, -4(%ebp)
```

Move the value `0` into the stack as a 32-bit value. The stack address written to is `%ebp - 4`, effectively 4 bytes below the address the base pointer currently holds and happens to be the location where the old value of AX was saved.

So now this appears to be clearing the previously saved value. House-keeping?

```s
	addl	$4, %esp
	popl	%ebp
```

Adds `4` to the address currently stored in the stack-pointer `%esp`. Effectively `SP = SP + 4`. Having zeroed out the data we stored in this stack frame this puts the stack-pointer back to the same address as the base-pointer. I.e. we're in a state of having no local variables.

Next `pop` copies the value currently stored at `%esp` into the base-pointer `%ebp`. This value was the old base-pointer we pushed at the start of `_main`. We're getting the stack ready to return to the code that called `_main`. At the end of this the stack-pointer will have been incremented above and will now point at what will be the stored address of the calling code.

```s
	retl
```

Finally, `ret` loads the value currently on the stack into the `%eip` instruction-pointer. Effectively making the CPU continue executing where we left off before `_main` was called.

The value we left in AX is the return value for the calling code. We can demonstrate this. If we alter our C source code to return a `17` instead of `0`:

```c
int main() {
    return 17;
}
```

Here's the output in assembly (showing just `_main`):

```s
_main:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	movl	$17, %eax    # <--- this was xorl	%eax, %eax in the previous example
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl
```

## Calling a function
