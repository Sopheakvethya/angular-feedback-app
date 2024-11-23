import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios from 'axios';
import Sentiment from 'sentiment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  formData = {
    name: '',
    email: '',
    rating: 1,
    comments: '',
  };

  sentimentResult = '';
  sentimentEmoji = '';
  backgroundColor = '#ffffff';
  sentiment = new Sentiment();

  onSubmit() {
    if (
      this.formData.name &&
      this.formData.email &&
      this.formData.rating &&
      this.formData.comments
    ) {
      console.log('Feedback Submitted:', this.formData);
      axios
        .post('http://localhost:3000/submit-feedback', this.formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          alert('Thank you for your feedback!');
        })
        .catch((error) => {
          console.error('There was an error submitting the feedback:', error);
        });
    }
  }

  analyzeSentiment() {
    const result = this.sentiment.analyze(this.formData.comments);
    const score = result.score;

    if (score > 0) {
      this.sentimentResult = 'Thank you for your positive feedback';
      this.sentimentEmoji = '😊';
      this.backgroundColor = '#d4f5d8'; // Light green for positive sentiment
    } else if (score < 0) {
      this.sentimentResult = 'We are sorry to hear that';
      this.sentimentEmoji = '😟';
      this.backgroundColor = '#f8d7da'; // Light red for negative sentiment
    } else {
      this.sentimentResult = 'Neutral Feedback';
      this.sentimentEmoji = '😐';
      this.backgroundColor = '#ffffff'; // Light yellow for neutral sentiment
    }
  }

  setRating(rating: number) {
    this.formData.rating = rating;
  }
}
