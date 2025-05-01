import {DialogUtils} from './dialog.utils';
import {Budget} from "../../budgets/models/budget.model";
import {Option} from '../models/option.model';
import {DialogAction} from '../models/dialog-action.model';

describe('DialogUtils', () => {
  describe('filterCategories', () => {
    it('should return all categories if action is edit', () => {
      const categories: Option[] = [
        {id: 1, value: 'Food'},
        {id: 2, value: 'Transport'}
      ];
      const budgets: Budget[] = [];
      const action = DialogAction.edit;

      const result = DialogUtils.filterCategories(categories, budgets, action);

      expect(result).toEqual(categories);
    });

    it('should filter out categories with id -1 and those already in budgets if action is not edit', () => {
      const categories: Option[] = [
        {id: 1, value: 'Food'},
        {id: -1, value: 'Transport'},
        {id: 2, value: 'Entertainment'}
      ];
      const budgets: Budget[] = [
        {category: 'Food', maximum: 100, theme: "red"}
      ];

      expect(DialogUtils.filterCategories(categories, budgets, DialogAction.add))
        .toEqual([{id: 2, value: 'Entertainment'}]);
    });
  });

  describe('getSelectedTheme', () => {
    it('should return the id of the theme matching the selected budget theme if action is edit', () => {
      const themes: Option[] = [
        {id: 1, value: 'Green', prefix: 'green'},
        {id: 2, value: 'Red', prefix: 'red'}
      ];
      const selectedBudget: Budget = {category: 'Food', maximum: 100, theme: 'red'};

      expect(DialogUtils.getSelectedTheme(DialogAction.edit, themes, selectedBudget)).toBe(2);
    });

    it('should return the id of the first theme if action is not edit', () => {
      const themes: Option[] = [
        {id: 1, value: 'Green', prefix: 'green'},
        {id: 2, value: 'Red', prefix: 'red'}
      ];
      const selectedBudget: Budget = {category: 'Food', maximum: 100, theme: 'red'};

      expect(DialogUtils.getSelectedTheme(DialogAction.add, themes, selectedBudget)).toBe(1);
    });
  });

  describe('getSelectedCategory', () => {
    it('should return the id of the category matching the given category if action is edit', () => {
      const categories: Option[] = [
        {id: 1, value: 'Food'},
        {id: 2, value: 'Transport'}
      ];
      const category = 'Transport';

      expect(DialogUtils.getSelectedCategory(DialogAction.edit, categories, category)).toBe(2);
    });

    it('should return the id of the first category if action is not edit', () => {
      const categories: Option[] = [
        {id: 1, value: 'Food'},
        {id: 2, value: 'Transport'}
      ];
      const category = 'Transport';

      expect(DialogUtils.getSelectedCategory(DialogAction.add, categories, category)).toBe(1);
    });
  });
});
