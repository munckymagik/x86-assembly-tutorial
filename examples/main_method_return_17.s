	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 12
	.globl	_main
	.p2align	4, 0x90
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	movl	$17, %eax
	movl	$0, -4(%ebp)
	addl	$4, %esp
	popl	%ebp
	retl


.subsections_via_symbols
