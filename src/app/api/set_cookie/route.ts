import { NextResponse, NextRequest } from "next/server";
import SunoApi from "@/lib/SunoApi";
import { corsHeaders } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (req.method === 'POST') {
    try {
	  //----------------------------
	  const SUNO_COOKIE = req.headers.get('suno_cookie');
	  
	  global.sunoApi = new SunoApi(SUNO_COOKIE || '');
	  global.sunoApi.init();
	  console.log(sunoApi.cook);
	  //----------------------------

      return new NextResponse(JSON.stringify("Completed"), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    } catch (error) {
      console.error('Error fetching limit:', error);

      return new NextResponse(JSON.stringify({ error: 'Internal server error. ' + error }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }
  } else {
    return new NextResponse('Method Not Allowed', {
      headers: {
        Allow: 'POST',
        ...corsHeaders
      },
      status: 405
    });
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: corsHeaders
  });
}