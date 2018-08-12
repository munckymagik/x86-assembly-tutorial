	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 12
	.globl	_main
	.p2align	4, 0x90
_main:                                  ## @main
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	subl	$24, %esp
	movl	$17, %eax
	movl	$0, -4(%ebp)
	movl	$17, (%esp)
	movl	%eax, -12(%ebp)         ## 4-byte Spill
	calll	_add_13
	movl	%eax, -8(%ebp)
	movl	-8(%ebp), %eax
	addl	$24, %esp
	popl	%ebp
	retl

	.p2align	4, 0x90
_add_13:                                ## @add_13
## BB#0:
	pushl	%ebp
	movl	%esp, %ebp
	pushl	%eax
	movl	8(%ebp), %eax
	movl	%eax, -4(%ebp)
	movl	-4(%ebp), %eax
	addl	$13, %eax
	addl	$4, %esp
	popl	%ebp
	retl


.subsections_via_symbols
