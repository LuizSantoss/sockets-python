import socket 
import threading

def handle_client(conn, addr):
    print(f"conexação estabelecida com {addr}")
    while True:
        try:
            data = conn.recv(1024)
            if not data:
               print("cliente desconectado")
               break
            msg = data.decode()
            print(f"cliente: {msg}")
            resposta = input("você (servidor)")
            conn.send(resposta.encode())
        except:
            print("erro na conexão com o cliente")
            break
    conn.close()

def main():
    host= socket.gethostname()
    port= 1234
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind((host, port))
    s.listen(1)
    print(f"servidor aguardando conexação em {host}:{port}...")
    conn, addr = s.accept()
    thread = threading.Thread(target=handle_client, args=(conn, addr))
    thread.start()

if __name__ == "__main__":
    main()