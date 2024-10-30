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

  const { isLoading, data, isError } = useQuery<QuotesType[]>({
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
          disabled={mutation.isPending}
        >
          Add Quote
        </Button>
      </div>
      <div className="text-center">
        {isLoading && <div>Loading...</div>}
        {!isLoading && isError && <div>An error occurred</div>}
        {!isLoading && !data?.length && <div>No quotes to show</div>}
      </div>
      {!isLoading && data && data?.length > 0 && (
        <ScrollArea className="grid grid-cols-1 mb-4 flex-grow">
          {data?.map((quote) => (
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
