type Props = {
  role: "user" | "assistant";
  content: string;
};


export default function MessageBubble({
  role,
  content
}: Props) {


  const isUser = role === "user";


  return (

    <div
      className={`
      flex
      ${isUser ? "justify-end" : "justify-start"}
      `}
    >

      <div
        className={`
        max-w-3xl
        rounded-xl
        px-4
        py-3

        ${
          isUser
          ?
          "bg-blue-600"
          :
          "bg-gray-800"
        }

        `}
      >

        {content}

      </div>


    </div>

  );

}