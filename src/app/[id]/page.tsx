import Image from "next/image";
import Link from "next/link";

export default function AthleteManager({ params }: any) {
  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 w-64 p-4">
        <ul>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Início
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Sobre
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Contato
            </a>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        <header className="bg-white shadow-md p-4 mb-4">
          <h1 className="text-3xl font-bold">{params.id}</h1>
        </header>
        <main>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
            amet nulla auctor, vestibulum magna sed, convallis ex.
          </p>
          <Link href="/">Voltar</Link>
        </main>
      </div>
    </div>
  );
}
