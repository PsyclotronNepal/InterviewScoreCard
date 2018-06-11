<?php

/**
 * Created by Reliese Model.
 * Date: Sat, 02 Jun 2018 17:36:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Document
 *
 * @property int $id
 * @property string $name
 * @property string $location
 * @property int $interviewee_id
 * 
 * @property \App\Models\Interviewee $interviewee
 *
 * @package App\Models
 */
class Document extends Eloquent
{
	public $timestamps = false;

	protected $casts = [
		'interviewee_id' => 'int'
	];

	protected $fillable = [
        'name',
        'location',
        'interviewee_id'
	];

	public function interviewee()
	{
		return $this->belongsTo(\App\Models\Interviewee::class);
	}
}
