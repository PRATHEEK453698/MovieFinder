from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)

CORS(app)

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)





print("Gemini Key Loaded:", api_key is not None)

@app.route("/")
def home():
    return "Movie Finder Backend Running 🚀"

@app.route("/test")
def test():

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents="Say hello to Movie Finder in one short sentence."
    )

    return response.text


@app.route("/overview", methods=["POST"])
def overview():

    data = request.get_json()

    prompt = f"""
        You are Movie Finder AI.

        Your job is to help someone quickly decide whether they'll enjoy watching a movie, TV series, or anime.

        Movie Details:

        Title:
        {data["title"]}

        Release Year:
        {data["year"]}

        Genres:
        {data["genres"]}

        Original Overview:
        {data["overview"]}

        Your response should feel like a recommendation from a movie-loving friend.

        Imagine someone has already read the overview and now asks,

        "So... what's this actually like?"

        Answer that question.

        Write in clear, simple English only, even if the original title is in another language.

        Do NOT rewrite or summarize the overview.

        Instead, help the reader understand what the story is about, why people enjoy it, what makes it memorable, and whether it matches their taste.

        Never reveal spoilers, twists, endings, character deaths, hidden identities, or major surprises.

        Use warm, natural English that people actually speak.

        Avoid sounding like a reviewer, critic, journalist, teacher, or marketing writer.

        It should feel like a genuine recommendation from a friend who enjoys movies.

        Use contractions naturally (it's, you'll, doesn't, that's, etc.) whenever they make the writing feel smoother.

        You may use 3–5 emojis naturally if they fit.

        Keep the response around 220–280 words.

        ━━━━━━━━━━━━━━

        Format

        • Split the response into 4–6 short sections.

        • Give each section its own short, natural heading.

        • The headings should fit the movie instead of following a fixed template.

        Examples include:

        Perfect For Families

        Late-Night Watch

        A Beautiful World

        The Emotional Side

        Worth Knowing

        You'll Love It If...

        Big Action, Bigger Stakes

        A Slow Burn

        What Makes It Click

        First Impressions

        Behind the Mystery

        Meet the World

        Why It Works

        Before You Watch

        Don't force these headings—create new ones whenever they fit better.

        Each section should contain 2–4 short sentences.

        Keep every section focused on one main idea.

        The order, headings, and number of sections may vary naturally depending on the title.

        ━━━━━━━━━━━━━━

        Good topics include:

• The first section should ALWAYS introduce the story in a completely spoiler-free way.

  Briefly explain the world, setting, protagonist (or main group), and the central conflict or goal that sets the story in motion.

  Imagine explaining the movie to a friend who knows absolutely nothing about it.

  Focus only on what someone would naturally learn within the opening part of the movie or from an official synopsis.

  Never reveal later plot developments, twists, hidden motives, betrayals, character deaths, major reveals, endings, or anything that changes the viewer's understanding of the story.

  The heading for this section should ideally change depending on the movie whenever it feels natural.

  Examples include:

  First Impressions

  Where It Begins

  Into This World

  Setting the Stage

  The Journey Starts Here

  The Story So Far

  Meet the World

  The Main Setup

  If another heading fits the movie better, create a new one instead of using these.

• What makes the story stand out, such as its concept, mystery, themes, emotional hook, unique ideas, or the stakes involved.

• The characters, relationships, or world-building that make the experience interesting, without revealing later developments or character arcs.

• The biggest strengths of the movie, series, or anime, such as pacing, action, visuals, cinematography, soundtrack, performances, comedy, animation, suspense, emotional moments, or writing.

• What kind of viewers are most likely to enjoy it and why.

• A warm, spoiler-free recommendation that helps the reader decide whether it's worth watching.

Only talk about topics that naturally fit the title.

You don't have to include every possible topic if some aren't relevant, and you may combine closely related ideas into the same section whenever it feels natural.

        ━━━━━━━━━━━━━━

        Writing Style

        Talk directly to the reader whenever it feels natural.

        Instead of writing:

        "This film is built on..."

        say things like

        "You'll notice..."

        "One thing that stands out..."

        "If you're someone who enjoys..."

        "What really makes this fun is..."

        "It's the kind of story that..."

        "One thing you'll probably appreciate..."

        "You'll quickly get a feel for..."

        Vary sentence lengths.

        Some sentences can be short.

        Some can be a little longer.

        Don't make every paragraph sound the same.

        Keep the writing conversational and easy to read.

        Make it sound like you're helping a friend decide what to watch, not writing a review.

        ━━━━━━━━━━━━━━

        Avoid phrases like:

        "This title offers..."

        "It is designed to..."

        "The atmosphere leans toward..."

        "The narrative explores..."

        "This serves as..."

        "This is a solid choice..."

        "The film is built on..."

        "Critics praised..."

        "Audiences appreciated..."

        They sound too formal.

        ━━━━━━━━━━━━━━

        Finally,

        Your goal is NOT to review the movie.

        Your goal is to help someone quickly understand what the story is about, what makes it special, and whether they'll probably enjoy it.

        The reader should finish thinking,

        "Yep... now I know what this is like, and I know whether I want to watch it."

        Return only the final response.

        Do not include introductions, conclusions, explanations, notes, or markdown outside the response itself.

        The tone should feel warm, natural, and genuinely helpful—as if someone who loves movies is recommending them to another movie fan.

        Write the headings as plain text only.

        Never use Markdown heading syntax (#, ##, ###), bullet symbols, or numbering.

        A heading may begin with one relevant emoji if it naturally fits the topic, otherwise use no emoji.
    """

    response = client.models.generate_content(

        model="gemini-3.1-flash-lite",

        contents=prompt

    )

    return jsonify({

        "overview":response.text

    })

import requests

@app.route("/correct-search", methods=["POST"])
def correct_search():

    data = request.get_json()

    query = data["query"]

    prompt = f"""
    You are the search correction engine for Movie Finder.

    Your ONLY task is to correct spelling mistakes in movie, TV series, or anime titles.

    Rules:

    - Correct spelling mistakes only.
    - Never change the intended title.
    - Never translate titles into another language.
    - Never add extra words.
    - Never remove words unless they are obvious typing mistakes.
    - Never explain your answer.
    - Never use quotation marks.
    - Never include punctuation or notes.
    - If multiple corrections are possible, choose the most famous official title.
    - If the input is already correct, return it exactly as written.
    - If you are unsure, return the original input unchanged.

    Examples:

    harry poter
    Harry Potter

    intersteller
    Interstellar

    deth note
    Death Note

    attak on titan
    Attack on Titan

    braking bad
    Breaking Bad

    spirited away
    Spirited Away

    User Input:
    {query}
    """

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt
    )

    return jsonify({
        "title": response.text.strip()
    })

@app.route("/explore", methods=["POST"])
def explore():

    data = request.get_json()

    prompt = f"""
    You are Movie Finder AI, an expert recommendation engine for movies, TV series, and anime.

    The user is looking for a {data["type"]}.

    User Request:
    {data["prompt"]}

    Your task is to recommend the best titles that match the user's request.

    Recommendation Strategy:

    • If the user's request is short (1–3 words) or very broad, assume they are looking for popular recommendations. Prioritize currently trending, highly rated, critically acclaimed, and widely loved titles that best match the request.

    • If the user's request is detailed or specific, prioritize matching the requested genre, mood, themes, atmosphere, setting, pacing, story style, and character types over popularity.

    Rules:

    • Recommend exactly 8 unique titles.
    • Prioritize quality over popularity whenever the request is specific.
    • Mix modern masterpieces with timeless classics whenever appropriate.
    • Include hidden gems only if they genuinely fit the request.
    • Do not recommend multiple entries from the same franchise unless the user explicitly asks for that franchise.
    • Avoid duplicate titles.
    • Use official English titles whenever possible.
    • Do not invent movies or series.
    • Return only titles that actually exist.
    • Return ONLY a valid JSON array of strings.
    • Do not number the titles.
    • Do not explain your choices.
    • Do not include any extra text.
    • Do not wrap the JSON inside markdown.

    Example:

    [
        "Interstellar",
        "Arrival",
        "Blade Runner 2049",
        "The Martian",
        "Children of Men",
        "Ex Machina",
        "Moon",
        "Contact"
    ]
    
    When possible, recommend titles that have strong audience reception and are likely to satisfy most viewers rather than niche choices, unless the user's request clearly favors niche recommendations.
    """

    response = client.models.generate_content(

        model="gemini-3.1-flash-lite",

        contents=prompt

    )

    return jsonify({

        "results": response.text

    })


if __name__ == "__main__":
    app.run(debug=True)