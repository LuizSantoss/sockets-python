import socket 
import threading

def receive_messages(sock):
    while True:
        try:
            data = sock.recv(1024)
            if not data:
                print("Servidor desconectado")
                break
        except:
            print("erro ao receber dados")
            break

def main():
    host = socket.gethostname()
    port = 1234

    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host, port))

    print(f"conectado ao servidor {host}:{port}")
    print("Digite mensagens e pressione ENTER para enviar \n")
    threading.Thread(target=receive_messages, args=(s,), daemon=True).start()

    while True:
        msg = input("Você (cliente)")
        if msg.lower() in ("sair", "exit", "quit"):
            print("Encerrando")
            s.close()
            break
        s.send(msg.encode())

if __name__ == "__main__":
    main()