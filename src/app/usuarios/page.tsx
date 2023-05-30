"use client";

import { LeftMenu } from "@/components/LeftMenu";
import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useRef, useState } from "react";

interface interfUsuarios {
  idusuario: number;
  nome: string;
  email: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [usuarios, setUsuarios] = useState<Array<interfUsuarios>>([]);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["shoopypainel.token"];
    if (!token) {
      router.push("/login");
    }

    axios
      .get("http://localhost:3001/usuarios")
      .then((resposta) => {
        setUsuarios(resposta.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setToast(true);
        setToastMessage("Erro ao carregar usuários1");
      });
  }, []);

  return (
    <>
      <Loading loading={loading} />
      <ToastComponent
        show={toast}
        message={toastMessage}
        colors="danger"
        onClose={() => {
          setToast(false);
        }}
      />
      <LeftMenu item="usuarios"></LeftMenu>
      <div className="container text-center">
        <h1>Usuários</h1>
        <div className=" d-flex justify-content-center">
          <table className="table table-dark w-50">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((rec) => {
                return (
                  <tr key={rec.idusuario}>
                    <th scope="row">{rec.idusuario}</th>
                    <td>{rec.nome}</td>
                    <td>{rec.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
