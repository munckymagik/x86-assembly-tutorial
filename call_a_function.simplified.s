	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 12
	.globl	_main
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	$17
	calll	_add_13
	addl	$4, %esp
	popl	%ebp
	retl

_add_13:                                ## @add_13
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	movl	8(%ebp), %eax
	addl	$13, %eax
	popl	%ebp
	retl


.subsections_via_symbols
