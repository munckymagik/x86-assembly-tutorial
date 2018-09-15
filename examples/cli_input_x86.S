.text

.globl _main
_main:
  # Set up the stack
  pushl %ebp
  movl %esp, %ebp

  # Load the value of argc into eax
  movl 8(%ebp), %eax

  # Return to calling code
  popl %ebp
  retl
