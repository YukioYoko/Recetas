import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

export function VerifyAccount() {
  const { email } = useParams();
  const [user, setUser] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:8000/getbyemail/", {
        params: { email: email }  // Utiliza params para incluir los parámetros de consulta
      });
      console.log(response.data);
      setUser(response.data.user_id);
    } catch (error) {
      console.error("Error registrando usuario:", error);
      navigate("/login");
    }
  };

  return (
    <div>
      <div>
        <form className="w-3/4" onSubmit={handleSubmit}>
          <div className="flex justify-center items-center flex-row pl-4 pt-7">
            <div className="SendButton">
              <input
                className="bg-custom-naranja-logo p-3 rounded-full"
                type="submit"
                value="Verify Account"
              />
            </div>
            <div className="pl-8">
              <a href="../login">Already have an account</a>
            </div>
          </div>
        </form>
        {user && <p>User ID: {user}</p>}
      </div>
    </div>
  );
}
