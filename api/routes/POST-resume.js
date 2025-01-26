import { RouteHandler } from "gadget-server";
import { openAIResponseStream } from "gadget-server/ai";

/**
 * Route handler for POST chat
 *
 * See: https://docs.gadget.dev/guides/http-routes/route-configuration#route-context
 */
const route = async ({ request, reply, api, logger, connections }) => {
  const prompt = JSON.stringify(request.body);

  const stream = await connections.openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `You are an expert AI recruiter who specializes in reviewing and improving resumes for hiring managers at top-tier companies like Google, Microsoft, Netflix, and Apple. 
      
      Your task is to enhance the provided JSON input by:
      1. Keeping the structure of the input JSON exactly the same.
      2. add an array impact with three descriptive bullet points under each "experience" and "project" that showcase the impact, achievements, and relevance of each entry, as if the candidate were applying to these top-tier companies. Never put - at the beginning of the bullet point.
      3. Correcting any grammar, spelling, or formatting issues in the provided input.
      4. If you see some mandatory fields like university, degree or skills that are not fully completed you can complete it but stay as accurate as possible, exemple : instead of harvared -> Harvard University, instead of bachelor : Bachelor of Science
      5. Make sure your output respects all the rules of JSON.
      
      Only respond with the modified JSON in the exact same structure, with the enhanced descriptions included. Do not include any additional text or explanations outside the JSON format.`
      },
      { role: "user", content: prompt },
    ],
    stream: true,
  });
  await reply.send(openAIResponseStream(stream));
};

export default route;