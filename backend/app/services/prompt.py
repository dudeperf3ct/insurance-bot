"""Prompts used by LLMs."""

CLASSIFY_PROMPT = """You are tasked with classifying whether a given document contains content related to insurance. Please follow these instructions carefully:

1. Read the following document:
<document>
{doc}
</document>

2. Analyze the content of the document to determine if it contains information related to insurance. Look for key indicators such as:
   - Mentions of insurance policies, coverage, or claims
   - References to insurance companies or agents
   - Discussion of premiums, deductibles, or benefits
   - Terms commonly associated with insurance (e.g., liability, risk, underwriting)

3. Based on your analysis, classify the document as either insurance-related or not insurance-related.

4. Before providing your final classification, explain your reasoning. Consider the following:
   - What specific elements in the document led to your conclusion?
   - If it is an insurance document, what type of insurance does it appear to be related to?
   - If it is not an insurance document, what is the main topic or purpose of the document?

5. Provide your justification within <justification> tags.

6. After your justification, output your final classification using the following format:
   <output>true</output> if the document is insurance-related
   <output>false</output> if the document is not insurance-related

Your complete response should be structured as follows:

<justification>
[Your detailed reasoning here]
</justification>

<output>[Your classification (true or false) here]</output>

Remember to base your classification solely on the content of the provided document. Do not make assumptions about information not present in the text.
"""

SUMMARIZE_PROMPT = """You are tasked with analyzing an insurance document and categorizing its content into three categories: good, bad, and okay. Here is the insurance document you need to analyze:

<document>
{doc}
</document>

Your task is to extract and categorize the content of the insurance document related to the policy into three categories:
1. What is good
2. What is bad
3. What is okay

Please follow these guidelines:
1. Carefully read and analyze the entire document.
2. Identify policy features, terms, or conditions that fit into each category.
3. It is not required to have content in all categories, but think carefully about which category each item belongs to.
4. Use your judgment to determine if a feature is good, bad, or okay based on how beneficial or detrimental it is to the policyholder.

Output your analysis using the following XML tags:
<what_is_good> for features that are clearly beneficial to the policyholder
<what_is_bad> for features that are clearly detrimental or unfavorable to the policyholder
<what_is_okay> for features that are neither particularly good nor bad, or have both positive and negative aspects

Here are examples of how to categorize content:

<what_is_good>
- No co-payment required: The insurer covers the entire cost of treatment up to the sum insured.
- Flexible room options: You can choose any room except for suites without additional charges.
</what_is_good>

<what_is_bad>
- Long waiting period for pre-existing diseases: The insurer will only cover pre-existing conditions after 4 years, which is longer than some other policies.
</what_is_bad>

<what_is_okay>
- Reasonable waiting period for pre-existing diseases: The insurer covers pre-existing conditions after a 3-year waiting period, which is neither exceptionally short nor long.
</what_is_okay>

Remember to think carefully about each feature and its implications for the policyholder before categorizing it. Provide clear and concise explanations for why each item is placed in its respective category.

Begin your analysis now, and present your findings using the specified XML tags.
"""
