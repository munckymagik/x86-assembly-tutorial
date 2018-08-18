.text

.globl _main
_main:
  # Set up the stack
  pushl %ebp
  movl %esp, %ebp

  # Padding to guarantee the correct stack alignment when we call printf
  pushl $0

  # Set the argument for printf, pushes the address of the "Hello world\n" string on the stack
  pushl $hello_world

  # In the debugger check `expression -f hex -- $esp & 0xF` is 0 at this point to prove stack alignment
  calll _printf

  # Remove the padding and argument from the stack
  addl $8, %esp

  # Set the exit status
  xorl %eax, %eax

  # Return to calling code
  popl %ebp
  retl

hello_world:
  .asciz "Hello world\n"
