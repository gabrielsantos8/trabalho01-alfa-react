"use client";

import { LeftMenu } from "@/components/LeftMenu";
import { Loading } from "@/components/Loading";
import { ToastComponent } from "@/components/Toast";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["shoopypainel.token"];
    if (!token) {
      router.push("/login");
    }
    setLoading(false);
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
      <LeftMenu item="dashboard"></LeftMenu>

      <div className="container text-center">
        <h1>Dashboard</h1>
      </div>
    </>
  );
}
