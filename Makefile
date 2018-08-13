CC := gcc
CFLAGS  = -std=c99
# CFLAGS += -g
# CFLAGS += -O1
CFLAGS += -m32
CFLAGS += -Wall
CFLAGS += -Wextra
CFLAGS += -pedantic
CFLAGS += -Werror

SRCS := $(wildcard *.c)
OUTPUTS := $(patsubst %.c,%.s,$(SRCS))

.PHONY: all
all: $(OUTPUTS)

.PHONY: info
info:
	@echo $(SRCS)
	@echo $(OUTPUTS)

.PHONY: clean
clean:
	rm -f *.out

$(OUTPUTS): Makefile

%.s: %.c
	$(CC) $(CFLAGS) -S $(<) -o $(@)

%.out: %.s
	$(CC) $(CFLAGS) $(<) -o $(@)
