CC = gcc
CFLAGS = -Wall -Wextra -pedantic
TARGET = agenda
OBJ = main.o agenda.o

all: $(TARGET)

$(TARGET): $(OBJ)
	$(CC) $(OBJ) -o $(TARGET)

main.o: main.c agenda.h
	$(CC) $(CFLAGS) -c main.c

agenda.o: agenda.c agenda.h
	$(CC) $(CFLAGS) -c agenda.c

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(OBJ) $(TARGET)