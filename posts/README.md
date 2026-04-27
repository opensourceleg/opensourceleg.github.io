# Community Articles

This directory contains MDX articles for the Open-Source Leg community website. Contributors can add articles by simply creating new `.mdx` files in this directory.

## Getting Started

### 1. Create a New Article

Create a new `.mdx` file in this directory with a descriptive filename using kebab-case:

```
posts/your-article-title.mdx
```

### 2. Add Frontmatter

Every article must start with frontmatter containing metadata:

```mdx
---
title: "Your Article Title"
date: "2024-01-15"
excerpt: "A brief description of your article that will appear in the listing."
author: "Your Name"
---
```

#### Required Fields

- **title**: The main title of your article
- **date**: Publication date in YYYY-MM-DD format
- **excerpt**: Brief description for article listings (150-200 characters)
- **author**: Your name or organization

### 3. Write Your Content

After the frontmatter, write your article content using Markdown with MDX enhancements:

```mdx
# Your Article Title

Your article content goes here. You can use all standard Markdown features plus:

- Code blocks with syntax highlighting
- Interactive components
- Links and images
- Tables and lists
- Custom React components

## Code Examples

```python
def hello_world():
    print("Hello, Open-Source Leg community!")
```

## Images

You can include images stored in the `/public` directory:

![Alt text](/path/to/your/image.png)
```

## Article Guidelines

### Content Standards

- **Relevant Topics**: Articles should relate to prosthetics, robotics, the Open-Source Leg platform, or related research
- **Quality**: Provide valuable insights, tutorials, or research findings
- **Accuracy**: Ensure technical information is correct and up-to-date
- **Clarity**: Write clearly and include explanations for technical concepts

### Writing Tips

1. **Start with a clear introduction** explaining what readers will learn
2. **Use descriptive headings** to organize your content
3. **Include code examples** when discussing technical topics
4. **Add images and diagrams** to illustrate concepts
5. **Provide next steps** or additional resources at the end

## Technical Details

### MDX Features

Articles are processed using MDX, which allows you to:

- Use React components within Markdown
- Include interactive elements
- Import and use JavaScript/TypeScript modules
- Create custom layouts and styling

### Custom Components

The following custom MDX components are available:

- **Headings**: Automatically styled with proper hierarchy
- **Code blocks**: Syntax highlighting for multiple languages
- **Links**: Styled to match the site design
- **Images**: Responsive and optimized
- **Tables**: Clean, accessible table styling
- **Blockquotes**: Emphasized quote styling

### File Processing

Articles are automatically:

1. **Parsed** for frontmatter metadata
2. **Processed** through MDX for component rendering  
3. **Styled** with custom typography components
4. **Indexed** for the articles listing page
5. **Generated** with proper URLs at `/articles/[slug]`

## Publishing Process

1. **Create your MDX file** in this directory
2. **Test locally** by running `npm run dev`
3. **Submit a pull request** to the main repository
4. **Article goes live** when PR is merged

## Examples

Check out the existing articles in this directory for examples:

- `getting-started-opensourceleg.mdx` - Tutorial-style article
- `control-algorithms-overview.mdx` - Technical deep-dive
- `community-spotlight-university-of-michigan.mdx` - Community feature

## Need Help?

- **Technical Issues**: Open an issue on GitHub
- **Content Questions**: Join our [forum discussions](https://opensourceleg.discourse.group/)
- **General Support**: Contact the community team

Thank you for contributing to the Open-Source Leg community! 🦾 