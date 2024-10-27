import { useState } from "react";
import { Link } from "react-router-dom";
import { UseAuth } from "./AuthProvider";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { fetchQuotes, postQuote } from "@/lib/get-add-data";
import { axiosInstance, showErrorToast, showSuccessToast } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type QuotesType = {
  id: string;
  text: string;
};

const Quote = () => {
  const [newQuote, setNewQuote] = useState("");
  const queryClient = useQueryClient();
  const { isLoggedIn, logout } = UseAuth();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["quotes"],
    queryFn: fetchQuotes,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  const mutation = useMutation({
    mutationFn: postQuote,
    onSuccess: async () => {
      setNewQuote("");
      queryClient.invalidateQueries({
        queryKey: ["quotes"],
        refetchType: "all",
      });
      showSuccessToast("Quote Posted");
    },
    onError: (error: any) => {
      showErrorToast(error);
    },
  });

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      logout();
      showSuccessToast("Logged out");
    } catch (error: any) {
      showErrorToast("Already Logged out");
    }
  };

  const typedData = data as QuotesType[];

  return (
    <>
      <div className="grid w-full gap-2 my-8">
        <Textarea
          placeholder="Write a new quote."
          className="resize-none text-base"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <Button
          className="mt-2"
          onClick={() => {
            mutation.mutate(newQuote);
          }}
        >
          Add Quote
        </Button>
      </div>
      {isLoading && <div className="text-center">Loading...</div>}
      {isError && <div className="text-center">An error occured</div>}
      {(!typedData || !typedData?.length) && (
        <div className="text-center">No quotes to show</div>
      )}
      {!isLoading && typedData?.length > 0 && (
        <ScrollArea className="grid grid-cols-1 mb-4 flex-grow">
          {typedData?.map((quote) => (
            <div className="bg-slate-800 rounded-md p-2 mb-4" key={quote.id}>
              <p className="text-center">{quote.text}</p>
            </div>
          ))}
        </ScrollArea>
      )}
      <div
        className={`mt-auto flex ${
          isLoggedIn ? "justify-between" : "justify-center"
        } items-center`}
      >
        {isLoggedIn && (
          <Button onClick={handleLogout} variant={"link"} className="p-0">
            Logout
          </Button>
        )}
        <Link to={"/secretquote"} className="text-center text-muted">
          Secret Quote
        </Link>
      </div>
    </>
  );
};

export default Quote;
